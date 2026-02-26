"use client"
import React from "react"
import { Button } from "@/app/_components/ui/button"
import { SmartphoneIcon } from "lucide-react"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado!")
  }

  return (
    <div className="flex justify-between">
      {/*Esquerda*/}
      <div className="flex items-center gap-2">
        <SmartphoneIcon size={24} />
        <p className="text-sm">{phone}</p>
      </div>

      {/*Direita*/}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
