// @ts-nocheck
import React from 'react';
import initialState from 'U:/TH01/src/.umi/plugin-initial-state/models/initialState';
import model0 from "U:/TH01/src/models/danhmuc/chucvu";
import model1 from "U:/TH01/src/models/import";
import model2 from "U:/TH01/src/models/randomuser";
import model3 from "U:/TH01/src/models/thongbao/nhansu";
import model4 from "U:/TH01/src/models/thongbao/noticeicon";
import model5 from "U:/TH01/src/models/thongbao/receiver";
import model6 from "U:/TH01/src/models/thongbao/sinhvien";
import model7 from "U:/TH01/src/models/thongbao/thongbao";
import model8 from "U:/TH01/src/models/tienich/auditlog";
import model9 from "U:/TH01/src/models/tienich/caidat";
import model10 from "U:/TH01/src/models/tienich/phanhoi";
import model11 from "U:/TH01/src/models/todo";
// @ts-ignore
import Dispatcher from './helpers/dispatcher';
// @ts-ignore
import Executor from './helpers/executor';
// @ts-ignore
import { UmiContext } from './helpers/constant';

export const models = { '@@initialState': initialState, 'danhmuc.chucvu': model0, 'import': model1, 'randomuser': model2, 'thongbao.nhansu': model3, 'thongbao.noticeicon': model4, 'thongbao.receiver': model5, 'thongbao.sinhvien': model6, 'thongbao.thongbao': model7, 'tienich.auditlog': model8, 'tienich.caidat': model9, 'tienich.phanhoi': model10, 'todo': model11 };

export type Model<T extends keyof typeof models> = {
  [key in keyof typeof models]: ReturnType<typeof models[T]>;
};

export type Models<T extends keyof typeof models> = Model<T>[T]

const dispatcher = new Dispatcher!();
const Exe = Executor!;

export default ({ children }: { children: React.ReactNode }) => {

  return (
    <UmiContext.Provider value={dispatcher}>
      {
        Object.entries(models).map(pair => (
          <Exe key={pair[0]} namespace={pair[0]} hook={pair[1] as any} onUpdate={(val: any) => {
            const [ns] = pair as [keyof typeof models, any];
            dispatcher.data[ns] = val;
            dispatcher.update(ns);
          }} />
        ))
      }
      {children}
    </UmiContext.Provider>
  )
}
