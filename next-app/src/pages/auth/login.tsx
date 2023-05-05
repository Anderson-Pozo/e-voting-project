import Image from "next/image";
import { InputText } from "primereact/inputtext";
// import escudo from "/public/assets/images/escudouecam.png";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AuthContext } from "./context/AuthContext";
import { useToast } from "hooks/useToast";
import { Toast } from "primereact/toast";


const schema = yup.object({
  username: yup.string().required('Usuario requerido')
    .max(10, "Ingrese 10 dígitos")
    .min(10, "Ingrese 10 dígitos"),
  password: yup.string().required('Contraseña requerida'),
}).required();

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { login } = useContext(AuthContext);

  const { showError, toast } = useToast();

  const onSubmit = async ({ username, password }: FormData) => {
    try {
      const validLogin = await login(username, password);
      if (validLogin) {
        router.replace('/');
      }
    } catch (error: any) {
      showError({ 
        severity: "warn", 
        summary: "Credenciales inválidas", 
        detail: error.message 
      });
    }
  };

  return (
    <>
      {/* <CustomHead title={"Iniciar sesión"} content={""} /> */}
      <div className="flex h-screen sm:flex-row items-center justify-center">
        <div className="md:w-8/12 lg:w-5/12 lg:ml-20 self-center">
          <h1 className="text-2xl text-green-cam font-extrabold text-center">
            Módulo de administración
          </h1>
          <p className="font-bold text-green-cam text-center text-xl mb-7">Iniciar sesión</p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-20">
            <label htmlFor="user" className="font-medium mb-2">Número de cédula</label>
            <span className="p-input-icon-left">
              <i className="pi pi-user" />
              <InputText
                {...register("username")}
                style={{ width: "100%" }}
                className={`${errors.username && "p-invalid"}`}
              />
            </span>
            <span className="text-red-500 text-xs">{errors.username?.message}</span>

            <label htmlFor="password" className="font-medium mb-2 mt-2">Contraseña</label>
            <span className="p-input-icon-left">
              <i className="pi pi-key" />
              <InputText
                {...register("password")}
                type="password"
                style={{ width: "100%" }}
                className={`${errors.password && "p-invalid"}`}
              />
            </span>
            <span className="text-red-500 text-xs">{errors.password?.message}</span>
            <button
              className="bg-blue-500 rounded-md mt-4 text-white font-semibold py-2 w-3/4 self-center"
              type="submit"
            >
              Ingresar
            </button>
            <Toast ref={toast}/>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;