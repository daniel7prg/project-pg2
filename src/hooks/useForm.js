import { useState } from 'react'

export const useForm = (initialForm = {}, initialMultiple = []) => {
    const [formData, setFormData] = useState(initialForm)
    const [formMultiple, setFormMultiple] = useState(initialMultiple)

    const onInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const onInputMultipleChange = (e, key) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({
            id: option.value,
            value: option.text,
        }));
        setFormMultiple((prev) => ({
            ...prev,
            [key]: selectedOptions, // Almacena la selección específica para cada `key`
        }));
    };

    const onReset = () => {
        setFormData(initialForm)
        setFormMultiple(initialMultiple)
    }

    return {
        formData,
        formMultiple,
        onInputMultipleChange,
        onInputChange,
        onReset
    }
}
