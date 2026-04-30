"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

type Department = {
  id: string;
  name: string;
  count: number;
};

type Member = {
  id: string;
  name: string;
  department: string;
  position: string;
};

type Employee = {
  id: number | string;
  username: string;
  first_name?: string;
  last_name?: string;
  department_id?: number | null;
  department_name?: string | null;
  user_type?: string | null;
};

type EmployeesResponse = {
  ok?: boolean;
  data?: {
    results?: Employee[];
  } | Employee[];
};

async function readJson(res: Response) {
  const text = await res.text().catch(() => "");
  if (!text.trim()) return null;

  try {
    return JSON.parse(text) as EmployeesResponse;
  } catch {
    return null;
  }
}

function getEmployees(payload: EmployeesResponse | null) {
  if (!payload) return [];
  if (Array.isArray(payload.data)) return payload.data;
  return payload.data?.results ?? [];
}

function getDisplayName(employee: Employee) {
  const fullName = [employee.first_name, employee.last_name].filter(Boolean).join(" ").trim();
  return fullName || employee.username;
}

function buildDepartments(employees: Employee[]) {
  const map = new Map<string, Department>();

  for (const employee of employees) {
    const id = String(employee.department_id ?? employee.department_name ?? "none");
    const name = employee.department_name || "未分配部門";
    const current = map.get(id) ?? { id, name, count: 0 };
    current.count += 1;
    map.set(id, current);
  }

  return Array.from(map.values());
}

export default function TeamUpgradePage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/auth/employees?profile__user_type=employee", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          setDepartments([]);
          setMembers([]);
          return;
        }

        const data = await readJson(res);
        const employees = getEmployees(data);

        setDepartments(buildDepartments(employees));
        setMembers(
          employees.map((employee) => ({
            id: String(employee.id),
            name: getDisplayName(employee),
            department: employee.department_name || "未分配部門",
            position: employee.user_type || "employee",
          }))
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const displayDepartments =
    departments.length > 0
      ? departments
      : [
          { id: "placeholder-1", name: "新增部門", count: 0 },
          { id: "placeholder-2", name: "新增部門", count: 0 },
          { id: "placeholder-3", name: "新增部門", count: 0 },
          { id: "placeholder-4", name: "新增部門", count: 0 },
        ];

  const displayMembers =
    members.length > 0
      ? members
      : [
          {
            id: "placeholder-1",
            name: "尚無成員",
            department: "尚無部門",
            position: "尚無職位",
          },
        ];

  return (
    <main className="min-h-screen bg-[#303030] text-white px-7 py-5 overflow-hidden">
      <h1 className="text-center text-lg tracking-widest mb-7">
        升級團隊，讓成長更有效
      </h1>

      <section className="relative flex items-center gap-9 mb-24">
        {displayDepartments.map((dept) => {
          const isPlaceholder = departments.length === 0 || dept.count === 0;

          return (
            <div
              key={dept.id}
              className={[
                "w-[205px] h-[205px] rounded-full flex-shrink-0",
                "flex flex-col items-center justify-center",
                "bg-[#303030] shadow-[0_0_18px_rgba(255,255,255,0.45)]",
                isPlaceholder
                  ? "opacity-35 shadow-[0_0_10px_rgba(0,0,0,0.8)]"
                  : "",
              ].join(" ")}
            >
              <p className="text-2xl tracking-widest mb-7">
                {loading ? "載入中" : dept.name}
              </p>
              <p className="text-sm">{dept.count} 人</p>
            </div>
          );
        })}

        <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 text-white/80" />
      </section>

      <section className="space-y-3 pr-8 max-h-[310px] overflow-y-auto custom-scrollbar">
        {displayMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-9">
            <div className="w-7 h-7 rounded border-2 border-white/25" />

            <div
              className={[
                "flex-1 h-[50px] rounded-full bg-[#353535]",
                "shadow-[0_2px_8px_rgba(0,0,0,0.7)]",
                "grid grid-cols-[150px_55px_1fr_55px_1fr_140px_32px]",
                "items-center px-12 text-lg",
              ].join(" ")}
            >
              <span>{loading ? "載入中" : member.name}</span>

              <span className="text-white/35">部門</span>
              <span>{member.department}</span>

              <span className="text-white/35">職位</span>
              <span>{member.position}</span>

              <button className="text-white/35 text-base text-left">
                查看技能地圖
              </button>

              <ChevronRight className="w-6 h-6 text-white/80" />
            </div>
          </div>
        ))}
      </section>

      <p className="text-center mt-6 text-lg font-semibold text-white/70">
        勾選與拖曳來加入團隊成員
      </p>

      <button
        type="button"
        onClick={() => router.push("/Dashboard")}
        className="fixed right-10 bottom-8 w-10 h-10 rounded-full flex items-center justify-center hover:scale-125 duration-300 ease-in-out shadow-[0_0_24px_rgba(0,0,0,0.8)] border-white border-2"
        title="Back To Dashboard"
      >
        <Home className="w-5 h-5" />
      </button>
    </main>
  );
}
