// NursePatients.jsx
export default function NursePatients() {
  const patients = [
    { name: "김철수", age: 45, status: "정상", statusColor: "text-green-600" },
    { name: "이영희", age: 52, status: "주의 필요", statusColor: "text-red-600" },
    { name: "박민수", age: 38, status: "경과 관찰", statusColor: "text-yellow-600" },
  ];

  return (
    <div className="p-6">
      {/* 제목 영역 */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">환자 목록</h2>
        <p className="text-sm text-gray-500 mt-1">간호사가 관리 중인 환자 리스트입니다.</p>
      </div>

      {/* 테이블 컨테이너 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-blue-50 text-gray-700 text-left">
            <tr>
              <th className="px-6 py-3 font-medium">이름</th>
              <th className="px-6 py-3 font-medium">나이</th>
              <th className="px-6 py-3 font-medium">상태</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-6 py-3 font-medium text-gray-800">{p.name}</td>
                <td className="px-6 py-3 text-gray-600">{p.age}</td>
                <td className={`px-6 py-3 font-semibold ${p.statusColor}`}>
                  {p.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
