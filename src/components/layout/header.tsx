type HeaderProps = {
  title: string
  hasSearchBar?: boolean
}

export default function Header({ title }: HeaderProps) {
  return (
    <>
      <h1 className="flex h-[94px] w-full items-center justify-start px-4 font-medium text-2xl tracking-wide md:px-15 ">
        {title}
      </h1>
    </>
  )
}
