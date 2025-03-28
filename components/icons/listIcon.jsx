const ListIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    fill="currentColor"
    className={`w-6 h-6 ${props.className ?? ""}`}
  >
    <circle cx="5.21" cy="9.17" r="2" />
    <circle cx="5.21" cy="17.17" r="2" />
    <circle cx="5.21" cy="25.17" r="2" />
    <path d="M32.42,9a1,1,0,0,0-1-1H10v2H31.42A1,1,0,0,0,32.42,9Z" />
    <path d="M31.42,16H10v2H31.42a1,1,0,0,0,0-2Z" />
    <path d="M31.42,24H10v2H31.42a1,1,0,0,0,0-2Z" />
  </svg>
);

export default ListIcon;
