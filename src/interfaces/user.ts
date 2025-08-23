import { Base } from "./global";
import { DocumentTypes } from "./tenant";

export interface User extends Base {
  employeeId?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  image?: string;
  maritalStatus: string;
  dateOfBirth?: string;
  nationality: string;
  religion?: string;
  gender?: string;
  address?: string;
  company: Company;
  personalContact?: PersonalContact;
  nextOfKin?: UserNextOfKin;
  reference?: EducationReference;
  references?: EducationReference[];
  qualifications?: UserQualification[];
  isHod?: boolean;
  isHr?: boolean;
  department?: UserDepartment;
  designation?: UserDesignation;
  branch?: CompanyBranch;
}

export interface EmployeeDetail extends Base {
  designation: UserDesignation;
  department: UserDepartment;
  branch?: CompanyBranch;
  supervisor?: User;
}

export interface EducationReference extends Base {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  occupation: string;
  placeOfWork: string;
}
export interface PersonalContact extends Base {
  email?: string;
  phone?: string;
  address?: string;
}
export interface UserDepartment extends Base {
  name: string;
  status?: string;
  hod?: User;
  staffsCount?: number;
  designations?: UserDesignation[];
}

export interface Company extends Base {
  name?: string;
  email?: string;
  phone?: string;
  headquartersAddress?: string;
  vision?: string;
  mission?: string;
  logo?: string;
  about?: string;
  website?: string;
  culture?: string;
  coreValues?: string;
}

export interface CompanyYearlyObjective extends Base {
  objective: string;
  year: string;
}
export interface CompanyBranch extends Base {
  location: string;
  commencementDate: string;
  staffsCount?: number;
  isHeadquater: boolean;
}

export interface UserDesignation extends Base {
  name: string;
  status?: string;
  department?: UserDepartment;
  staffsCount?: number;
  jobDescription?: string;
}

export interface Qualification extends Base {
  name: string;
  designations?: UserDesignation[];
  isRequired?: boolean;
}
export interface UserQualification extends Base {
  qualification: Qualification;
  graduationDate: string;
  school: string;
  grade: string;
  major: string;
  certificate?: string;
}

export interface UserNextOfKin extends Base {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  relationship: string;
}

export interface UserReference extends Base {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  placeOfWork: string;
  occupation: string;
}

export interface Role extends Base {
  name: string;
  description?: string;
  permissions?: Permission[];
  users?: User[];
}

export interface Permission extends Base {
  name: string;
}

export interface UserDocument extends Base {
  documentType?: DocumentTypes;
  file: string;
}

export interface CrewVerificationChecklistType extends Base {
  name: string;
}

export interface CrewVerificationChecklistRequirement extends Base {
  name: string;
}
