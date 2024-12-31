import DataTransaksi from "./penghasilan/dataTransaksi";
import PenghasilanPart from "./penghasilan/penghasilan";

export default function Penghasilan() {
  return (
    <div className="flex flex-col gap-8">
      <PenghasilanPart />
      <DataTransaksi />
    </div>
  );
}
