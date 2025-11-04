import { useAuth } from "./AuthContext";
import { ROLES } from "../utils/roles";
import PredictDiease from "../views/template/PredictDiease";
import PredictDiseaseUser from "../views/template/PredictDiseaseUser";

const RoleBasedPredictPage = () => {
  const { me } = useAuth();

  if (!me) return <div>로그인 정보 로딩중...</div>;

  if ([ROLES.DOCTOR, ROLES.ADMIN].includes(me.role)) {
    return <PredictDiease />;
  }

  return <PredictDiseaseUser />;
};

export default RoleBasedPredictPage;
