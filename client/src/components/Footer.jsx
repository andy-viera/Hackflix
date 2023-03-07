import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function footer() {
  return (
    <div
      className="flex justify-center items-center  bg-gray-800 "
      style={{ height: "20vh" }}
    >
      <div className="text-purple-700 text-lg font-semibold">
        Hackflix | By Andrés Viera | 2023 |{" "}
        <a href="https://github.com/andy-viera">
          <GitHubIcon />
        </a>{" "}
        <a href="https://www.linkedin.com/in/andr%C3%A9s-viera/">
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
}
