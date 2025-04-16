export default function TestDrawingDialogContent() {
  return (
    <div className="relative z-0">
      <p className="px-6 py-1.5 text-white font-zen-old-mincho bg-theme-beige-primary rounded-br-2xl absolute top-0 left-0 z-3">
        試し書きスペース
      </p>
      <div className="absolute inset-0 -z-1">
        <picture>
          <img
            src="/bg-canvas.jpg"
            alt="台紙"
            width="1400"
            height="1050"
            className="size-full object-cover"
          />
        </picture>
      </div>
      <canvas
        width={800}
        height={650}
        className="relative z-1 size-full bg-slate-50/50"
      />
    </div>
  )
}
