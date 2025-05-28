"use client"

import { Button } from "@/components/shadcn-ui/button"
import { Checkbox } from "@/components/shadcn-ui/checkbox"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowDownUp, ChevronsUpDown } from "lucide-react"
import React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu"
import type { Member } from "@/models/Member"

const HeaderText = ({ children }: { children: React.ReactNode }) => (
  <span className="font-normal text-muted-foreground">{children}</span>
)

export const columns: ColumnDef<Member>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: () => <HeaderText>Id</HeaderText>,
  },
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-[0.5px]">
          <HeaderText>Username</HeaderText>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowDownUp
              style={{ width: "14px", height: "14px" }}
              className="text-muted-foreground"
            />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "nickName",
    header: () => <HeaderText>Nickname</HeaderText>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      const selected = column.getFilterValue() as string[] | undefined

      return (
        <div className="flex items-center gap-[0.5px]">
          <HeaderText>Role</HeaderText>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                <ChevronsUpDown
                  style={{ width: "10px", height: "10px" }}
                  className="text-muted-foreground"
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-[6rem] p-1.5 text-sm">
              {/* ADMIN */}
              <button
                type="button"
                onClick={() => {
                  const checked = selected?.includes("ADMIN")
                  column.setFilterValue(
                    checked
                      ? (selected?.filter(r => r !== "ADMIN") ?? [])
                      : [...(selected ?? []), "ADMIN"]
                  )
                }}
                className="flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-left"
              >
                <Checkbox className="size-3" checked={selected?.includes("ADMIN")} />
                <span className="text-muted-foreground text-xs">ADMIN</span>
              </button>

              {/* 구분선 */}
              <DropdownMenuSeparator className="my-1 h-[0.5px] bg-muted" />

              {/* USER */}
              <button
                type="button"
                onClick={() => {
                  const checked = selected?.includes("USER")
                  column.setFilterValue(
                    checked
                      ? (selected?.filter(r => r !== "USER") ?? [])
                      : [...(selected ?? []), "USER"]
                  )
                }}
                className="flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-left"
              >
                <Checkbox className="size-3" checked={selected?.includes("USER")} />
                <span className="text-muted-foreground text-xs">USER</span>
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    cell: ({ row }) => row.getValue("role"),
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue?.length) return true
      return filterValue.includes(row.getValue(columnId))
    },
  },
  {
    accessorKey: "createDate",
    header: ({ column }) => (
      <div className="flex items-center gap-[0.5px]">
        <HeaderText>Create Date</HeaderText>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowDownUp
            style={{ width: "14px", height: "14px" }}
            className="text-muted-foreground"
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue("createDate") as Date
      return date.toISOString().slice(0, 10) // "YYYY-MM-DD"
    },
  },
  {
    accessorKey: "modifiedDate",
    header: ({ column }) => (
      <div className="flex items-center gap-[0.5px]">
        <HeaderText>Modified Date</HeaderText>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowDownUp
            style={{ width: "14px", height: "14px" }}
            className="text-muted-foreground"
          />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue("modifiedDate") as Date
      return date.toISOString().slice(0, 10)
    },
  },
]
