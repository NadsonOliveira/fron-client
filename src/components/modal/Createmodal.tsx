import { Button, Input } from "@chakra-ui/react"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
} from "@/components/ui/dialog"
import { FC, useState } from "react"
import { Field } from "../ui/field"
import { createClient } from "@/components/service/apiService"  
import { toaster } from "../ui/toaster" // Use seu toaster

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { name: string, email: string, telefone: string }) => void
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [telefone, setTelefone] = useState<string>("")

  const handleSave = async () => {
    if (!name || !email || !telefone) {
      toaster.error({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        duration: 6000,
      });
      return;
    }

    const newClient = { name, email, telefone };
    try {
      await onSave(newClient);

      setName("");
      setEmail("");
      setTelefone("");
      onClose();

      toaster.success({
        title: "Cliente Cadastrado",
        description: `O cliente ${name} foi cadastrado com sucesso!`,
        duration: 6000,
      });
    } catch (error) {
      toaster.error({
        title: "Erro ao cadastrar",
        description: "Ocorreu um erro ao tentar cadastrar o cliente.",
        duration: 6000,
      });
    }
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Cliente</DialogTitle>
        </DialogHeader>
        <DialogBody display={'Flex'} flexDirection={"row"} gap={4}>
          <Field label="Name">
            <Input 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </Field>
          <Field label="Email">
            <Input 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Field>
        </DialogBody>
        <DialogBody display={'Flex'} flexDirection={"row"} gap={4}>
          <Field label="Telefone">
            <Input 
              placeholder="12345-6789" 
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)} 
              w={'48%'} 
            />
          </Field>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
