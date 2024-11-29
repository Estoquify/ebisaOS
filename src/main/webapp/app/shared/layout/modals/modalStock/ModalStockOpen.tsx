import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import React, { useState } from "react"
import { toNumber } from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faSave } from "@fortawesome/free-solid-svg-icons"

import './ModalStock.scss'

interface IModalStockOpen {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>
    data?: any
}

const ModalStockOpen = (props: IModalStockOpen) => {
    const {isOpen, setIsOpen} = props
 
    const [quantidadeSolicitacao, setQuantidadeSolicitacao] = useState<string>();

    const handleCreateSolicitacao = () => {

    }

    return(
        <Modal isOpen={isOpen} toggle={() => setIsOpen(false)} className="modal-stock-container">
            <ModalHeader className="modal-stock-header-container">
                Abrir Solicitação
            </ModalHeader>
            <ModalBody className="modal-stock-body-container">
                <span> Informe a quantidade que foi solicitada</span>
                <div className="modal-stock-body-input-container">
                    <Input 
                        type="text"
                        value={quantidadeSolicitacao}
                        onChange={(e) => setQuantidadeSolicitacao(e.target.value)}
                        placeholder="Informe a quantidade aqui"
                    />
                </div>
            </ModalBody>

            <ModalFooter className="modal-stock-footer-container">
                <Button onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    Voltar
                </Button>

                <Button onClick={() => handleCreateSolicitacao()}>
                    Salvar
                    <FontAwesomeIcon icon={faSave}/>
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalStockOpen
