import { useNavigate } from "react-router-dom";

function useAnimateButtons() {
  const navigate = useNavigate();

  function navigateToView(route) {
    setTimeout(() => {
      navigate(route);
    }, 200);
  }

  return { navigateToView };
}

export { useAnimateButtons };
