/**
 * Vista de mantenimiento: imagen que se ajusta a la ventana sin recortes.
 * Agregar en public una imagen llamada mantenimiento.png (o .jpg, .webp).
 */
export default function Mantenimiento() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-auto bg-white"
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: '-webkit-fill-available',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mantenimiento.png"
        alt="Mantenimiento"
        className="max-w-full max-h-full w-auto h-auto object-contain"
        style={{
          objectFit: 'contain',
          maxWidth: '200%',
          maxHeight: '100vh',
          width: 'auto',
          height: 'auto',
        }}
      />
    </div>
  )
}
