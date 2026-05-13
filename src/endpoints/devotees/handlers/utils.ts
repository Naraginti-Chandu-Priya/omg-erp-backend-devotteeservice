import { randomUUID } from 'crypto';
import { FamilyMembers } from 'db';
import { sequelize } from 'node-server-engine';

export type FamilyMemberRelation =
  | 'Spouse'
  | 'Son'
  | 'Daughter'
  | 'Father'
  | 'Mother'
  | 'Brother'
  | 'Sister'
  | 'Other';

export type FamilyMemberGender = 'Male' | 'Female' | 'Other';

export interface NormalizedFamilyMember {
  id: string;
  relation: FamilyMemberRelation;
  member_name: string;
  date_of_birth?: string;
  gender?: FamilyMemberGender;
  occupation?: string;
  phone?: string;
  rasi?: string;
  nakshatra?: string;
  parent_node: boolean;
}

interface RawFamilyMember {
  id?: unknown;
  relation?: unknown;
  member_name?: unknown;
  date_of_birth?: unknown;
  gender?: unknown;
  occupation?: unknown;
  phone?: unknown;
  rasi?: unknown;
  nakshatra?: unknown;
  parent_node?: unknown;
}

const FAMILY_GENDERS = new Set<FamilyMemberGender>(['Male', 'Female', 'Other']);

export function parsePositiveInteger(value: unknown, fallback: number): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

function normalizeRelation(value: unknown): FamilyMemberRelation {
  if (typeof value !== 'string') return 'Other';

  const normalized = value.trim().toLowerCase();
  const relationMap: Record<string, FamilyMemberRelation> = {
    spouse: 'Spouse',
    son: 'Son',
    daughter: 'Daughter',
    father: 'Father',
    mother: 'Mother',
    brother: 'Brother',
    sister: 'Sister',
    other: 'Other'
  };

  return relationMap[normalized] ?? 'Other';
}

function normalizeGender(value: unknown): FamilyMemberGender | undefined {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim();
  if (!FAMILY_GENDERS.has(normalized as FamilyMemberGender)) {
    return undefined;
  }
  return normalized as FamilyMemberGender;
}

function normalizeFamilyMembers(raw: unknown): NormalizedFamilyMember[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const parsedMembers = raw
    .filter(
      (entry): entry is RawFamilyMember =>
        Boolean(entry) && typeof entry === 'object'
    )
    .map((entry) => {
      const member_name =
        typeof entry.member_name === 'string' ? entry.member_name.trim() : '';
      const relation = normalizeRelation(entry.relation);
      const providedId = typeof entry.id === 'string' ? entry.id : undefined;
      const date_of_birth =
        typeof entry.date_of_birth === 'string'
          ? entry.date_of_birth.trim()
          : undefined;
      const gender = normalizeGender(entry.gender);
      const occupation =
        typeof entry.occupation === 'string'
          ? entry.occupation.trim()
          : undefined;
      const phone =
        typeof entry.phone === 'string' ? entry.phone.trim() : undefined;
      const rasi =
        typeof entry.rasi === 'string' ? entry.rasi.trim() : undefined;
      const nakshatra =
        typeof entry.nakshatra === 'string'
          ? entry.nakshatra.trim()
          : undefined;
      const parent_node = entry.parent_node === true;

      return {
        providedId,
        relation,
        member_name,
        date_of_birth: date_of_birth || undefined,
        gender,
        occupation,
        phone,
        rasi,
        nakshatra,
        parent_node
      };
    })
    .filter((entry) => entry.member_name.length > 0);

  return parsedMembers.map((entry) => ({
    id: entry.providedId || randomUUID(),
    relation: entry.relation,
    member_name: entry.member_name,
    date_of_birth: entry.date_of_birth,
    gender: entry.gender,
    occupation: entry.occupation,
    phone: entry.phone,
    rasi: entry.rasi,
    nakshatra: entry.nakshatra,
    parent_node: entry.parent_node
  }));
}

export async function persistFamilyMembers(
  devotee_id: string,
  rawFamilyMembers: unknown,
  transaction: Awaited<ReturnType<typeof sequelize.transaction>>
): Promise<void> {
  if (!Array.isArray(rawFamilyMembers)) {
    return;
  }

  await FamilyMembers.destroy({ where: { devotee_id }, transaction });

  const normalizedMembers = normalizeFamilyMembers(rawFamilyMembers);

  if (normalizedMembers.length === 0) {
    return;
  }

  await FamilyMembers.bulkCreate(
    normalizedMembers.map((member) => ({
      id: member.id,
      devotee_id,
      relation: member.relation,
      member_name: member.member_name,
      date_of_birth: member.date_of_birth,
      gender: member.gender,
      occupation: member.occupation,
      phone: member.phone,
      rasi: member.rasi,
      nakshatra: member.nakshatra,
      parent_node: member.parent_node
    })),
    { transaction }
  );
}
