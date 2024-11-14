import { Button, For, IconButton, Stack, Table } from "@chakra-ui/react"
import { DivTable} from "./styles/table"
import { useCallback, useEffect, useState } from "react"
import { Modal } from "./components/modal/Createmodal"
import { createClient, deleteClient, getClientById, getData, Item, updateClient } from "./components/service/apiService"
import { dateFormat } from "./utils/dateFormat"
import { toaster } from "./components/ui/toaster"
import { ModalEdit } from "./components/modal/UpdateModal"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"

function App() {
  const [isModalOpen, setModalOpen] = useState(false) 
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const handleOpenModal = () => setModalOpen(true)  
  const handleCloseModal = () => setModalOpen(false) 
  const [selectedClient, setSelectedClient] = useState<any>(null);
  
  const loadData = async () => {
    try {
      const result = await getData();
      setItems(result.dados);
  
    } catch (error) {
      console.error('Erro ao carregar dados', error);
    }
  };
  const handleOpenModalEdit = async (id: number) => {
    const clientData = await findIdCliente(id);
  
    if (clientData) {
      console.log("Cliente selecionado:", clientData);
      setIsModalUpdateOpen(true);
    } else {
      console.error("Cliente não encontrado.");
    }
  };
  
  const handleCloseModalEdit = () => {
    setIsModalUpdateOpen(false);
    setSelectedClient(null); 
  };
  
  const findIdCliente = async (id: number): Promise<any> => { 
    try {
      const clientData = await getClientById(id);
      if (clientData && clientData.dados) {
        setSelectedClient(clientData.dados);
        return clientData.dados; 
      } else {
        console.error("Dados do cliente não encontrados.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      return null;
    }
  };

  const deleteCliente = async (id: number): Promise<void> => { 
    try {
      await deleteClient(id); 
      setItems(prevItems => prevItems.filter(item => item.id !== id)); 
      toaster.success({
        title: "Cliente deletado com sucesso",
        description: `Cliente com ID ${id} foi deletado.`,
      });
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      toaster.error({
        title: "Erro ao deletar",
        description: "Ocorreu um erro ao tentar deletar o cliente.",
      });
    }
  };
  

  const handleSave = useCallback(async (newClient: Item) => {
    try {
      const createdClient = await createClient({
        name: newClient.name,
        email: newClient.email,
        telefone: newClient.telefone,
        data_cadastro: new Date().toISOString().split('T')[0], 
      });
  
      setItems(prevItems => [...prevItems, createdClient]);
  
      toaster.success({
        title: "Cadastro realizado com sucesso",
        description: `Cliente ${createdClient.name} foi cadastrado.`,
      });
    } catch (error) {
      toaster.error({
        title: "Erro ao cadastrar",
        description: "Ocorreu um erro ao tentar cadastrar o cliente.",
      });
    }
  }, [setItems, toaster]); 
  
  

  const handleSaveEdit = useCallback(async (data: Item) => {
    try {
      const updatedData = await updateClient(selectedClient?.id, {
        name: data.name,
        email: data.email,
        telefone: data.telefone,
      });
  
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === updatedData.id ? updatedData : item
        )
      );
  
      toaster.success({
        title: "Atualização realizada com sucesso",
        description: `Cliente ${updatedData.name} foi atualizado.`,
      });
  
      handleCloseModalEdit();
    } catch (error) {
      toaster.error({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao tentar atualizar o cliente.",
      });
    }
  }, [selectedClient, updateClient, setItems, toaster, handleCloseModalEdit]);
  
  
  
  useEffect(() => {
    loadData()
  }, [items])

  return (
    <>
        <DivTable style={{ position: "relative" }}>
        <Button 
          onClick={handleOpenModal} 
          position={"absolute"}
          top={'94px'}
          right={'152px'}
        >
          Cadastrar
        </Button>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}  onSave={handleSave} />
        <ModalEdit isOpen={isModalUpdateOpen}  onClose={handleCloseModalEdit} onSave={handleSaveEdit} clientData={selectedClient}/>

        <Stack gap="10" w={'100%'}>
          <For each={["outline"]}>
            {(variant) => (
              <Table.Root key={variant} size="sm" variant={variant}>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Nome</Table.ColumnHeader>
                    <Table.ColumnHeader>Email</Table.ColumnHeader>
                    <Table.ColumnHeader>Telefone</Table.ColumnHeader>
                    <Table.ColumnHeader>Data Cadastro</Table.ColumnHeader>
                    <Table.ColumnHeader>Action</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {items.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.email}</Table.Cell>
                      <Table.Cell>{item.telefone}</Table.Cell>
                      <Table.Cell>{dateFormat(item.data_cadastro)}</Table.Cell>
                      <Table.Cell>
                      <IconButton
                         aria-label="Editar"
                         onClick={() => handleOpenModalEdit(item.id)}
                         variant="outline"
                         size="sm"
                         mr={2} 
                      >
                       <EditIcon />
                      </IconButton>
                      <IconButton
                          aria-label="Deletar"
                          onClick={() => deleteCliente(item.id)}
                          colorScheme="red"
                          variant="outline"
                          size="sm"
                          mr={2} 
                      >
                       <DeleteIcon />
                      </IconButton>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            )}
          </For>
        </Stack>
      </DivTable>
    </>
  )
}

export default App
