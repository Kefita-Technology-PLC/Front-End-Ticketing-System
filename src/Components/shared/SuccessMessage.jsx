export default function SuccessMessage({slot}) {
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg z-50">
      {slot}
    </div>
  );
}