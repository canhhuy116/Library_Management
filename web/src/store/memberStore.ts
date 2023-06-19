import memberService from '@/service/memberService';
import dayjs from 'dayjs';
import { observable, action } from 'mobx';

export interface IMember {
  id: number;
  name: string;
  type: string;
  birthday: dayjs.Dayjs;
  address: string;
  email: string;
  createDate: dayjs.Dayjs;
}

class MemberStore {
  @observable memberData: IMember[] = [];

  @action getAll = async () => {
    try {
      const result = await memberService.getAll();
      this.memberData = result.members;
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
}

export default MemberStore;
