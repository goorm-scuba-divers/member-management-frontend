type HeaderProps = {
  title: string
  hasSearchBar?: boolean
}

export default function Header({ title }: HeaderProps) {
  return (
    <>
      <h1 className="flex items-center py-2 text-2xl font-medium tracking-wide h-[94px]">
        {title}
      </h1>
    </>
  )
}
