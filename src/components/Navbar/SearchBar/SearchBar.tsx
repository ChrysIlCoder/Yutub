import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SearchBar.scss'
import { useForm } from "react-hook-form";
import InputField from "../../InputField/InputField";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams({query: ''})
  const {handleSubmit, register, formState: { errors }} = useForm()
  const navigate = useNavigate()

  const handleSubmitSearch = (data: any) => {
    if (data.search_query !== '') {
      console.log(data)
      setSearchParams(prev => {
        prev.set('query', data.search_query)
        return prev
      }, {replace: true})
      navigate(`/search?${searchParams}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit((data) => handleSubmitSearch(data))}
      className="search_bar_container"
    >
      <InputField
        input="input"
        classname="search_bar_container__input_search"
        register={register}
        errors={errors}
        name="search_query"
        options={{
          placeholder: 'Search',
          type: "search",
        }}
      />
      <button className="search_bar_container__input_submit">
        <FontAwesomeIcon size="lg" icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
