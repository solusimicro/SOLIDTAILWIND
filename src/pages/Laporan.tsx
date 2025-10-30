import Button from "../components/ButtonColl";
export default function Laporan() {
  return (
    <div class="p-6  bg-gray-50 text-center">
      <h2 class="text-2xl font-bold mb-4">Laporan Page</h2>
      <p>Welcome to the Laporan page!</p>
      <div>
        <Button
          type="primary"
          label="Laporan"
          onClick={() => alert("Tombol diklik!")}
        ></Button>
      </div>
    </div>
  );
}
