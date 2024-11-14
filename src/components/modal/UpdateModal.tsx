import { Button, Input } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
} from "@/components/ui/dialog";
import { FC, useEffect, useState } from "react";
import { Field } from "../ui/field";
import { toaster } from "../ui/toaster";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; email: string; telefone: string }) => void;
  clientData: { name: string; email: string; telefone: string }; 
}

export const ModalEdit: FC<ModalProps> = ({ isOpen, onClose, onSave, clientData }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  useEffect(() => {
    if (clientData && isOpen) {
      setName(clientData.name);
      setEmail(clientData.email);
      setTelefone(clientData.telefone);
    }
  }, [clientData, isOpen]);

  const handleChange = (field: string, value: string) => {
    if (field === "name") {
      setName(value);
    } else if (field === "email") {
      setEmail(value);
    } else if (field === "telefone") {
      setTelefone(value);
    }
  };

  const handleSave = async () => {
    if (!name || !email || !telefone) {
      toaster.error({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        duration: 6000,
      });
      return;
    }

    const updatedClient = { name, email, telefone };

    try {
      console.log('updatedClientupdatedClientupdatedClient',updatedClient)
      await onSave(updatedClient);

      setName("");
      setEmail("");
      setTelefone("");
      onClose(); 

      toaster.success({
        title: "Cliente Atualizado",
        description: `O cliente ${name} foi atualizado com sucesso!`,
        duration: 6000,
      });
    } catch (error) {
      toaster.error({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao tentar atualizar o cliente.",
        duration: 6000,
      });
    }
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Cliente</DialogTitle>
        </DialogHeader>
        <DialogBody display={"Flex"} flexDirection={"row"} gap={4}>
          <Field label="Name">
            <Input
               placeholder="Name"
               value={name}
               onChange={(e) => handleChange("name", e.target.value)} // Atualiza 'name'
            />
          </Field>
          <Field label="Email">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => handleChange("email", e.target.value)} // Atualiza 'email'
            />
          </Field>
        </DialogBody>
        <DialogBody display={"Flex"} flexDirection={"row"} gap={4}>
          <Field label="Telefone">
            <Input
              placeholder="12345-6789"
              value={telefone}
              onChange={(e) => handleChange("telefone", e.target.value)} // Atualiza 'telefone'
              w={"48%"}
           />
          </Field>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </DialogActionTrigger>
          <Button onClick={handleSave}>Atualizar</Button> {/* Botão de Atualização */}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
