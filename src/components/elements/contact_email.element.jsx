import Link from "next/link";

const ContactEmail = ({email, title, isHidden}) => {
  const contactEmail = isHidden ? email.replace(".", "@@") : email;
  return (
    <Link
      className="--default-link"
      onMouseOver={(e) => (e.target.href = e.target.href.replace("@@", "."))}
      href={`mailto:${contactEmail}`}
    >
      {" "}
      {title}
    </Link>
  );}
export default ContactEmail;