
    export  interface TokenResponse {
    data: {
      token: string;
    }
  }

export interface LoginResponse {
  success: boolean;
  data: UserInfo[];
  message: string;
  error: unknown;
}


export interface UserInfo {
  hn: string;
  pname: string;
  fname: string;
  lname: string;
  birthday: string;
}

export type LabResult = {
  vn: string;
  hn: string;
  vstdate: string;
  cc: string;
  diagnosis: string;
  drug_list: string | null;
  lab_result: string;
  pname: string;
  fname: string;
  lname: string;
  birthday: string;
  clinic: string;
  drugallergy: string;
  informaddr: string;
  cid: string;
  mobile_phone_number: string;
};

export type LabResultItem = {
  vn: string;
  hn: string;
  vstdate: string;
  cc: string;
  diagnosis: string;
  drug_list: string;
  lab_result: string;
  pname: string;
  fname: string;
  lname: string;
  birthday: string;
  clinic: string;
  drugallergy: string;
  informaddr: string;
  cid: string;
  mobile_phone_number: string;
};

export type LabResultResponse = {
  success: boolean;
  data: LabResultItem[];
};
