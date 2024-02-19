import { createContext, useContext } from 'react';
import { useState } from 'react';
import { hubApi } from '../service/api';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { UserContext } from './userContext';

export const DashboardContext = createContext({});


export const DashboardProvider = ({ children }) => {
    const [isVisible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    
    const {cardList, setCardList} = useContext(UserContext);
    
    const closeModal = () => {
        setVisible(false)
    }

    const closeEditModal = () => {
        setEditVisible(false);
        setEditingCard(null)
    }


    useEffect(() => {
        const userId = localStorage.getItem('@ID')
        const getList = async () => {
            try {
                const { data } = await hubApi.get(`/users/${userId}`);
                setCardList(data.techs);
            } catch (error) {
                console.log(error)
            }
        }
        getList()
    }, [])

    const createListItem = async (formData) => {
        const token = localStorage.getItem('@TOKEN');
        try {
            const { data } = await hubApi.post('/users/techs', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCardList([...cardList, data])
            toast.success('Tecnologia cadastrada com sucesso.')
        } catch (error) {
            if (error.response.status == 401) {
                toast.error('Tecnologia já cadastrada.')
            } else {
                toast.error('Houve algum erro, tente novamente')
                console.log(error)
            }
        }
    }

    const deleteCard = async (id) => {
        const token = localStorage.getItem('@TOKEN');
        try {
            await hubApi.delete(`/users/techs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const newCardList = cardList.filter(card => card.id !== id);
            setCardList(newCardList)
            toast.success('Tecnologia deletada com sucesso.')
        } catch (error) {
            console.log(error)
        }
    }


    const editCard = async (formData) => {
        const token = localStorage.getItem('@TOKEN');
        try {
            const { data } = await hubApi.put(`/users/techs/${editingCard.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const newCardList = cardList.map(card => {
                if (card.id === editingCard.id) {
                    return data;
                } else {
                    return card
                }
            })
            setCardList(newCardList)
            setEditingCard(null)
            toast.success('Tecnologia alterada com sucesso.')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <DashboardContext.Provider value={{ isVisible, setVisible, editVisible, setEditVisible, closeModal, cardList, setCardList, createListItem, deleteCard, setEditingCard, closeEditModal, editCard, editingCard }}>
            {children}
        </DashboardContext.Provider>
    )
}