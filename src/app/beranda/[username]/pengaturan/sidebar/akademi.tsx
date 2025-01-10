export default function Akademi() {
  const datas = [
    {
      src: "1",
      title: "Tutorial Menjadi Creator di Mategram",
      author: "Akademi Creator",
    },
    {
      src: 2,
      title: "Tutorial Upload Konten di Mategram",
      author: "Akademi Creator",
    },
    {
      src: 3,
      title: "Tutorial Edit Konten di Mategram",
      author: "Akademi Creator",
    },
    {
      src: 4,
      title: "Tutorial Cuan Cepat di Mategram",
      author: "Akademi Creator",
    },
    {
      src: 5,
      title: "Tutorial Mendapatkan Banyak Subscriber di Mategram",
      author: "Akademi Creator",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-black text-2xl font-bold mb-4">Akademi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {datas.map((data) => (
          <div
            key={data.src}
            className="bg-white rounded-2xl shadow p-4 min-h-auto"
          >
            <div className="flex flex-col gap-2">
              <video
                src={`/akademi/${data.src}.mp4`}
                className="w-full h-full bg-gray-600 rounded-md"
                controls
              >
                Your browser does not support the video tag.
              </video>
              <h2 className="text-black text-md font-semibold">{data.title}</h2>
              <p className="text-gray-400 text-sm font-normal">
                by {data.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
