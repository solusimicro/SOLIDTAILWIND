import Button from "../components/ButtonCollection";

export default function Iuran() {
  const handleClick = (msg: string) => {
    alert("Tombol diklik: " + msg);
  };

  return (
    <div class="flex flex-wrap gap-3 p-4">
      <Button type="purple" label="Ungu" onClick={() => handleClick("Ungu")} />
      <Button
        type="purple1"
        label="Gradasi Ungu"
        onClick={() => handleClick("Gradasi")}
      />
      <Button type="blue" label="Biru" onClick={() => handleClick("Biru")} />
      <Button type="green" label="Hijau" onClick={() => handleClick("Hijau")} />
      <Button type="red" label="Merah" onClick={() => handleClick("Merah")} />
      <Button
        type="gray"
        label="Abu-abu"
        onClick={() => handleClick("Abu-abu")}
      />
    </div>
  );
}
