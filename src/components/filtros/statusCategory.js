import '../../styles/statusCategory.css'
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export const StatusCategory = forwardRef(({ setStatus, setCategory }, ref) => {

    useImperativeHandle(ref, () => ({
        clearFilters,
    }));

    const clearFilters = () => {
        setSelectedStatus(null)
        setSelectedCategory(null)
    }

    // STATUS STATUS STATUS STATUS STATUS STATUS STATUS STATUS STATUS
    const [statusData, setDataStatus] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null); // Estado para armazenar o botão selecionado

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchStatus();
                setDataStatus(data);
            } catch (error) {
                console.error('Erro ao buscar status:', error);
            }
        }
        fetchData();

    }, []);

    async function fetchStatus() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:5000/status", requestOptions);
        if (!response.ok) {
            throw new Error('Falha em listar os status');
        }

        const data = await response.json();
        return data;
    }

    const handleStatusClick = (statusId) => {
        if (selectedStatus === statusId) {
            setSelectedStatus(null); // Desseleciona o botão se ele já estiver selecionado
            setStatus(''); // Limpa o filtro se nenhum botão estiver selecionado
        } else {
            setSelectedStatus(statusId); // Seleciona o botão
            setStatus(`status=${statusId}`); // Define o filtro conforme o statusId
        }
    };

    // STATUS STATUS STATUS STATUS STATUS STATUS STATUS STATUS STATUS

    // CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY
    const [categoryData, setDataCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); // Estado para armazenar o botão selecionado

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchCategory();
                setDataCategory(data);
            } catch (error) {
                console.error('Erro ao buscar Category:', error);
            }
        }
        fetchData();

    }, []);

    async function fetchCategory() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:5000/category", requestOptions);
        if (!response.ok) {
            throw new Error('Falha em listar os category');
        }

        const data = await response.json();
        return data;
    }

    const handleCategoryClick = (categoryId) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null); // Desseleciona o botão se ele já estiver selecionado
            setCategory(''); // Limpa o filtro se nenhum botão estiver selecionado
        } else {
            setSelectedCategory(categoryId); // Seleciona o botão
            setCategory(`categoryId=${categoryId}`); // Define o filtro conforme o categoryId
        }
    };
    // CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY CATEGORY

    return (
        <>
            <div style={{ margin: '0 0 10px 0' }}>

                <div>
                    <h3 style={{ color: 'white', margin: '3px  0' }}>Status</h3>
                </div>
                <div>
                    {statusData.map((statusItem, index) => (
                        <button
                            key={index}
                            onClick={() => handleStatusClick(statusItem.id)}
                            className={`status ${statusItem.status}${selectedStatus === statusItem.id ? '-selecionado' : ''}`}
                        >
                            {statusItem.status.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <div>
                    <h3 style={{ color: 'white', margin: '3px  0' }}>Categoria</h3>
                </div>
                <div>
                    {categoryData.map((categoryItem, index) => (
                        <button
                            style={{ margin: '3px' }}
                            key={index}
                            onClick={() => handleCategoryClick(categoryItem.id)}
                            className={`category${selectedCategory === categoryItem.id ? '-selecionado' : ''}`}
                        >
                            {categoryItem.category.replaceAll('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
})
