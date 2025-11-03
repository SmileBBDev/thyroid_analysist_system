export default function DashboardHome() {
  return (
    <>
    <div>
      <h2 className="text-2xl font-semibold mb-4">대시보드 홈</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-lg">환자 수: 32명</div>
        <div className="p-6 bg-white shadow rounded-lg">오늘 방문: 8명</div>
        <div className="p-6 bg-white shadow rounded-lg">담당 간호사: 5명</div>
      </div>
    </div>
    </>
  );
}
