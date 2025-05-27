type HeaderProps = {
  title: string
  hasSearchBar?: boolean
}

export default function Header({ title }: HeaderProps) {
  return (
    <>
      <h1 className="flex items-center justify-start w-full px-4 md:px-15 text-2xl font-medium tracking-wide h-[94px]">
        {title}
      </h1>
    </>
  )
}
