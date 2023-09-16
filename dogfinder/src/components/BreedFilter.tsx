import { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setBreeds, removeBreeds } from "../features/filter/filterSlice";
import { useDogService } from "../services/dog/dogServices";

interface IBreedFilterProps {
    containerStyles: string;
}

const BreedFilter = ({ containerStyles }: IBreedFilterProps) => {
    const dogService = useDogService();
    const [breedsList, setBreedsList] = useState<string[]>([]);
    const [breedsChecked, setBreedsChecked] = useState({});
    const dispatch = useAppDispatch();
    const breedParam = useAppSelector(state => state.filter.breeds);

    useEffect(() => {
        if (dogService !== undefined) {
            dogService.getBreeds()
                .then(response => setBreedsList(response));
        }
    }, [])


    const filterBreed = (checked: boolean, breed: string) => {
        setBreedsChecked({ ...breedsChecked, [breed]: checked });
        if (checked === true) {
            dispatch(setBreeds(`&breeds=${breed}`))
        } else {
            const newBreedParam = breedParam.replace(`&breeds=${breed}`, "")
            dispatch(removeBreeds(newBreedParam))
        }
    }

    return (
        <>
            {
                breedsList.map(breed => {
                    return (
                        <div key={breed} className={containerStyles}>
                            <label className="mr-2">{breed}</label>
                            <Checkbox onClick={(e: any) => filterBreed(e.target?.checked, breed)} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default BreedFilter;