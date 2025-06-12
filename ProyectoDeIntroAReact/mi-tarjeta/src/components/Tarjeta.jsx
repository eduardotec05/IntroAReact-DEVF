export function Tarjeta() {
  const nombre = "Eduardo Padilla";
  const profesion = "Computer Engineer";
  const mensaje =
    "¡Hello! I am a Computer Engineer with a passion for technology and innovation. I love coding and creating solutions that make life easier.";

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <img src="/src/assets/ingecomputacion.jpg" alt="Computer Engineer" />

        <div className="p-5">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            {nombre}
          </h1>

          <h2 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {profesion}
          </h2>

          <p className="mb-3 font-normal text-gray-200 dark:text-gray-400">
            {mensaje}
          </p>
        </div>
      </div>
    </>
  );
}
