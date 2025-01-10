import DataTransaksi from "./penghasilan/dataTransaksi";
import PenghasilanPart from "./penghasilan/penghasilan";

export default function Penghasilan() {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col gap-8 bg-white">
        <PenghasilanPart />
        <DataTransaksi />
      </div>
    </div>
  );
}
