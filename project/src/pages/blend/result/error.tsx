interface ComponentProps {
  error: Error
}

export function ErrorComponent({ error }: ComponentProps) {
  return (
    <div>
      <h1>Error</h1>
    </div>
  )
}
