import { useState, type ChangeEvent, type FormEvent } from "react";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const emptyForm: ContactForm = { name: "", email: "", message: "" };

export default function About() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [sent, setSent] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSent(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Simulação de envio (sem backend)
    setSent(true);
    setForm(emptyForm);
  }

  return (
    <section>
      <h1>Sobre o projeto</h1>
      <p>
        A <strong>Receitaria</strong> é uma aplicação web criada como
        trabalho final da disciplina de Front-end Frameworks (Análise e
        Desenvolvimento de Sistemas), usando React, TypeScript e React Router.
        As receitas vêm da API pública TheMealDB.
      </p>

      <h2>Contato</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          E-mail
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mensagem
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="btn">
          Enviar
        </button>
        {sent && <p className="success">Mensagem enviada com sucesso! ✅</p>}
      </form>
    </section>
  );
}
