import {
  EndpointAuthType,
  EndpointHandler,
  reportError
} from 'node-server-engine';
import { WhereOptions, Op } from 'sequelize';
import {
  Devotee,
  Spiritualinformation,
  CommunicationPreference,
  ReminderPreference,
  FamilyMembers,
  Donation,
  PoojaSeva
} from 'db';
import { parsePositiveInteger } from './utils';

export const getAllDevoteesHandler: EndpointHandler<
  EndpointAuthType.NONE
> = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status
    } = req.query as Record<string, unknown>;

    const currentPage = parsePositiveInteger(page, 1);
    const requestedLimit = parsePositiveInteger(limit, 10);
    const pageSize = Math.min(requestedLimit, 100);
    const offset = (currentPage - 1) * pageSize;
    const searchTerm = typeof search === 'string' ? search.trim() : '';

    const searchClause = searchTerm
      ? {
          [Op.or]: [
            { first_name: { [Op.like]: `%${searchTerm}%` } },
            { last_name: { [Op.like]: `%${searchTerm}%` } },
            { phone: { [Op.like]: `%${searchTerm}%` } },
            { email: { [Op.like]: `%${searchTerm}%` } },
            { devotee_code: { [Op.like]: `%${searchTerm}%` } }
          ]
        }
      : {};

    const statusClause =
      status === 'Active' || status === 'Inactive' ? { status } : {};

    const where: WhereOptions<Devotee> = {
      is_deleted: false,
      ...searchClause,
      ...statusClause
    };

    const { rows, count } = await Devotee.findAndCountAll({
      where,
      distinct: true,
      include: [
        { model: Spiritualinformation },
        { model: CommunicationPreference },
        { model: ReminderPreference },
        { model: FamilyMembers },
        { model: Donation },
        { model: PoojaSeva }
      ],
      limit: pageSize,
      offset,
      order: [['created_at', 'DESC']]
    });

    const totalPages = count === 0 ? 0 : Math.ceil(count / pageSize);

    res.json({
      data: rows,
      meta: {
        total: count,
        page: currentPage,
        limit: pageSize,
        totalPages,
        hasPrevPage: currentPage > 1,
        hasNextPage: currentPage < totalPages
      }
    });
  } catch (error) {
    reportError(error);
    res.status(500).json({ message: 'Failed to fetch devotees' });
  }
};
