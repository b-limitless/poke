interface IFormHelperText {
  text: string | null;
  style?: any;
}

const myStyles: any = {
  fontFamily: "Poppins, san-sarif !important",
  fontWeight: 400,
  fontSize: "1rem",
  lineHeight: 1.66,
  letterSpacing: "0.03333em",
  textAlign: "left",
  marginTop: "3px",
  marginRight: "14px",
  marginBottom: 0,
  marginLeft: "14px",
  color: "#d32f2f",
};

export default function ErrorText({ text, style }: IFormHelperText) {
  return <div style={{ ...myStyles, ...style }}>{text}</div>;
}
