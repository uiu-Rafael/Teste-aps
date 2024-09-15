/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, FormEvent, useState } from 'react';
import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';
import { BootstrapInput } from '../Inputs/BootstrapInput';
import {
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { z } from 'zod';

// Definição do schema de validação usando Zod
const meetupSchema = z.object({
  image: z.string().url({ message: 'URL da imagem inválida.' }),
  cnpj: z
    .string()
    .length(14, { message: 'CNPJ deve ter 14 caracteres.' })
    .regex(/^\d+$/, { message: 'CNPJ deve conter apenas números.' }),
  name: z.string().min(1, { message: 'Nome é obrigatório.' }).max(100),
  fantasyname: z
    .string()
    .min(1, { message: 'Nome fantasia é obrigatório.' })
    .max(100),
  cep: z
    .string()
    .length(8, { message: 'CEP deve ter 8 caracteres.' })
    .regex(/^\d+$/, { message: 'CEP deve conter apenas números.' }),
  logradouro: z
    .string()
    .min(1, { message: 'Logradouro é obrigatório.' })
    .max(100),
  bairro: z.string().min(1, { message: 'Bairro é obrigatório.' }).max(100),
  city: z.string().min(1, { message: 'Cidade é obrigatória.' }).max(100),
  uf: z
    .string()
    .length(2, { message: 'UF deve ter 2 caracteres.' })
    .regex(/^[A-Z]{2}$/, {
      message: 'UF é obrigatório.',
    }),
  complement: z.string().max(100).optional(),
  email: z.string().email({ message: 'Email inválido.' }).max(100),
  phone: z.string().regex(/^\d{10,15}$/, {
    message: 'Telefone deve ter entre 10 a 15 dígitos.',
  }),
});

// Definição do tipo para os dados do meetup
interface MeetupData {
  image: string;
  cnpj: string;
  name: string;
  fantasyname: string;
  cep: string;
  logradouro: string;
  bairro: string;
  city: string;
  uf: string;
  complement: string;
  email: string;
  phone: string;
}

// Definição das propriedades esperadas pelo componente NewMeetForm
interface NewMeetFormProps {
  onAddMeetup: (meetupData: MeetupData) => void;
}

const NewMeetForm: React.FC<NewMeetFormProps> = (props) => {
  // Referências para os inputs do formulário
  const imageInputRef = useRef<HTMLInputElement>(null);
  const cnpjInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fantasynameInputRef = useRef<HTMLInputElement>(null);
  const cepInputRef = useRef<HTMLInputElement>(null);
  const logradouroInputRef = useRef<HTMLInputElement>(null);
  const bairroInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const complementInputRef = useRef<HTMLTextAreaElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Estado para armazenar o valor do Select
  const [uf, setUf] = useState('');

  // Estado para armazenar mensagens de erro
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Função para lidar com o envio do formulário
  const submitHandler = async (event: FormEvent) => {
    setLoadingSubmit(true);
    event.preventDefault();

    // Dados iniciais do formulário
    const meetupData: MeetupData = {
      image: imageInputRef.current?.value || '',
      cnpj: cnpjInputRef.current?.value || '',
      name: nameInputRef.current?.value || '',
      fantasyname: fantasynameInputRef.current?.value || '',
      cep: cepInputRef.current?.value || '',
      logradouro: logradouroInputRef.current?.value || '',
      bairro: bairroInputRef.current?.value || '',
      city: cityInputRef.current?.value || '',
      uf: uf,
      complement: complementInputRef.current?.value || '',
      email: emailInputRef.current?.value || '',
      phone: phoneInputRef.current?.value || '',
    };

    // Validação dos dados usando o schema do Zod
    const validationResult = meetupSchema.safeParse(meetupData);

    if (!validationResult.success) {
      // Mapeia as mensagens de erro do Zod para o estado de erros
      const formErrors = validationResult.error.errors.reduce((acc, error) => {
        if (error.path.length > 0) {
          setLoadingSubmit(false);
          acc[error.path[0]] = error.message;
        }
        return acc;
      }, {} as Record<string, string>);
      setErrors(formErrors);
      return;
    }

    // Verifica CNPJ antes de enviar
    if (meetupData.cnpj.length === 14) {
      setLoadingCnpj(true);
      try {
        const response = await fetch(
          `https://publica.cnpj.ws/cnpj/${meetupData.cnpj}`,
        );
        const data = await response.json();

        if (response.ok && data) {
          // Preenche os dados com as informações do CNPJ
          nameInputRef.current!.value = data.razao_social || '';
          fantasynameInputRef.current!.value =
            data.estabelecimento.nome_fantasia || '';
          cepInputRef.current!.value =
            data.estabelecimento.cep.replace(/[.-]/g, '') || '';
          logradouroInputRef.current!.value =
            data.estabelecimento.logradouro || '';
          bairroInputRef.current!.value = data.estabelecimento.bairro || '';
          cityInputRef.current!.value = data.estabelecimento.cidade.nome || '';
          setUf(data.estabelecimento.estado.sigla || '');
          emailInputRef.current!.value = data.estabelecimento.email || '';
          phoneInputRef.current!.value = data.estabelecimento.telefone1 || '';
          complementInputRef.current!.value =
            data.estabelecimento.complemento || '';
        } else {
          throw new Error('CNPJ não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do CNPJ:', error);
        setErrors({ cnpj: 'Erro ao buscar dados do CNPJ. Verifique o valor.' });
        setLoadingCnpj(false);
        return;
      }
      setLoadingCnpj(false);
    } else {
      setErrors({ cnpj: 'CNPJ deve ter 14 caracteres.' });
      return;
    }

    // Verifica CEP antes de enviar
    if (meetupData.cep.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${meetupData.cep}/json/`,
        );
        const data = await response.json();

        if (response.ok && !data.erro) {
          // Preenche os dados com as informações do CEP
          logradouroInputRef.current!.value = data.logradouro || '';
          bairroInputRef.current!.value = data.bairro || '';
          cityInputRef.current!.value = data.localidade || '';
          setUf(data.uf || '');
          complementInputRef.current!.value = data.complemento || '';
        } else {
          throw new Error('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do CEP:', error);
        setErrors({ cep: 'Erro ao buscar dados do CEP. Verifique o valor.' });
        setLoadingCep(false);
        setLoadingSubmit(false);
        return;
      }
      setLoadingCep(false);
      setLoadingSubmit(false);
    } else {
      setErrors({ cep: 'CEP deve ter 8 caracteres.' });
      return;
    }

    // Se tudo for válido, envia os dados
    setErrors({});
    props.onAddMeetup(meetupData);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setUf(event.target.value);
  };

  // Adicione estados de carregamento para as buscas de CNPJ e CEP
  const [loadingCnpj, setLoadingCnpj] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Função para buscar dados do CNPJ e preencher os campos
  const fetchCnpjData = async () => {
    setLoadingCnpj(true); // Ativa o estado de carregamento
    const cnpj = cnpjInputRef.current?.value;
    if (cnpj && cnpj.length === 14) {
      try {
        const response = await fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`);
        const data = await response.json();

        console.log(data);

        // Atualiza os inputs com os dados da API
        if (data) {
          nameInputRef.current!.value = data.razao_social || '';
          fantasynameInputRef.current!.value =
            data.estabelecimento.nome_fantasia || '';
          cepInputRef.current!.value =
            data.estabelecimento.cep.replace(/[.-]/g, '') || '';
          logradouroInputRef.current!.value =
            data.estabelecimento.logradouro || '';
          bairroInputRef.current!.value = data.estabelecimento.bairro || '';
          cityInputRef.current!.value = data.estabelecimento.cidade.nome || '';
          setUf(data.estabelecimento.estado.sigla || '');
          emailInputRef.current!.value = data.estabelecimento.email || '';
          phoneInputRef.current!.value = data.estabelecimento.telefone1 || '';
          complementInputRef.current!.value =
            data.estabelecimento.complemento || '';
        }
      } catch (error) {
        console.error('Erro ao buscar dados do CNPJ:', error);
        setErrors({ cnpj: 'Erro ao buscar dados do CNPJ. Verifique o valor.' });
      } finally {
        setLoadingCnpj(false); // Desativa o estado de carregamento
      }
    } else {
      setErrors({ cnpj: 'CNPJ deve ter 14 caracteres.' });
      setLoadingCnpj(false);
    }
  };

  // Função para buscar dados do CEP e preencher os campos
  const fetchCepData = async () => {
    setLoadingCep(true); // Ativa o estado de carregamento
    const cep = cepInputRef.current?.value;
    if (cep && cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        console.log(data);

        if (data.erro) {
          throw new Error('CEP não encontrado');
        }

        // Atualiza os inputs com os dados da API
        if (data) {
          logradouroInputRef.current!.value = data.logradouro || '';
          bairroInputRef.current!.value = data.bairro || '';
          cityInputRef.current!.value = data.localidade || '';
          setUf(data.uf || '');
          complementInputRef.current!.value = data.complemento || '';
        }
      } catch (error) {
        console.error('Erro ao buscar dados do CEP:', error);
        setErrors({ cep: 'Erro ao buscar dados do CEP. Verifique o valor.' });
      } finally {
        setLoadingCep(false); // Desativa o estado de carregamento
      }
    } else {
      setErrors({ cep: 'CEP deve ter 8 caracteres.' });
      setLoadingCep(false);
    }
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="image">IMAGEM URL</label>
          <input type="url" id="image" ref={imageInputRef} />
          {errors.image && <p className={classes.error}>{errors.image}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="cnpj">CNPJ</label>
          <input type="text" id="cnpj" ref={cnpjInputRef} />
          <Button
            variant="contained"
            color="success"
            endIcon={
              loadingCnpj ? (
                <CircularProgress color="success" size={20} />
              ) : (
                <SearchIcon />
              )
            }
            onClick={fetchCnpjData}
            disabled={loadingCnpj}
          >
            Buscar
          </Button>
          {errors.cnpj && <p className={classes.error}>{errors.cnpj}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="name">NOME</label>
          <input type="text" id="name" ref={nameInputRef} />
          {errors.name && <p className={classes.error}>{errors.name}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="fantasyname">NOME FANTASIA</label>
          <input type="text" id="fantasyname" ref={fantasynameInputRef} />
          {errors.fantasyname && (
            <p className={classes.error}>{errors.fantasyname}</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="cep">CEP</label>
          <input type="text" id="cep" ref={cepInputRef} />
          <Button
            variant="contained"
            color="success"
            endIcon={
              loadingCep ? (
                <CircularProgress color="success" size={20} />
              ) : (
                <SearchIcon />
              )
            }
            onClick={fetchCepData}
            disabled={loadingCep}
          >
            Buscar
          </Button>
          {errors.cep && <p className={classes.error}>{errors.cep}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="logradouro">LOGRADOURO</label>
          <input type="text" id="logradouro" ref={logradouroInputRef} />
          {errors.logradouro && (
            <p className={classes.error}>{errors.logradouro}</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="bairro">BAIRRO</label>
          <input type="text" id="bairro" ref={bairroInputRef} />
          {errors.bairro && <p className={classes.error}>{errors.bairro}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="city">CIDADE</label>
          <input type="text" id="city" ref={cityInputRef} />
          {errors.city && <p className={classes.error}>{errors.city}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="uf">UF</label>
          <FormControl sx={{ m: 0, minWidth: 120 }}>
            <Select
              value={uf}
              onChange={handleChange}
              displayEmpty
              input={<BootstrapInput />}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="AC">AC</MenuItem>
              <MenuItem value="AL">AL</MenuItem>
              <MenuItem value="AP">AP</MenuItem>
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="BA">BA</MenuItem>
              <MenuItem value="CE">CE</MenuItem>
              <MenuItem value="DF">DF</MenuItem>
              <MenuItem value="ES">ES</MenuItem>
              <MenuItem value="GO">GO</MenuItem>
              <MenuItem value="MA">MA</MenuItem>
              <MenuItem value="MT">MT</MenuItem>
              <MenuItem value="MS">MS</MenuItem>
              <MenuItem value="MG">MG</MenuItem>
              <MenuItem value="PA">PA</MenuItem>
              <MenuItem value="PB">PB</MenuItem>
              <MenuItem value="PR">PR</MenuItem>
              <MenuItem value="PE">PE</MenuItem>
              <MenuItem value="PI">PI</MenuItem>
              <MenuItem value="RJ">RJ</MenuItem>
              <MenuItem value="RN">RN</MenuItem>
              <MenuItem value="RS">RS</MenuItem>
              <MenuItem value="RO">RO</MenuItem>
              <MenuItem value="RR">RR</MenuItem>
              <MenuItem value="SC">SC</MenuItem>
              <MenuItem value="SP">SP</MenuItem>
              <MenuItem value="SE">SE</MenuItem>
              <MenuItem value="TO">TO</MenuItem>
            </Select>
            {errors.uf && <p className={classes.error}>{errors.uf}</p>}
          </FormControl>
        </div>
        <div className={classes.control}>
          <label htmlFor="complement">COMPLEMENTO</label>
          <textarea id="complement" rows={5} ref={complementInputRef} />
          {errors.complement && (
            <p className={classes.error}>{errors.complement}</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="email">E-MAIL</label>
          <input type="email" id="email" ref={emailInputRef} />
          {errors.email && <p className={classes.error}>{errors.email}</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="phone">TELEFONE</label>
          <input type="tel" id="phone" ref={phoneInputRef} />
          {errors.phone && <p className={classes.error}>{errors.phone}</p>}
        </div>
        <div className={classes.actions}>
          <Button
            variant="contained"
            endIcon={
              loadingSubmit ? (
                <CircularProgress sx={{ color: '#77002E' }} size={20} />
              ) : (
                ' '
              )
            }
            disabled={loadingSubmit}
            type="submit"
          >
            Criar Reunião
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default NewMeetForm;
