import { APIGateway } from "../services/APIGateway";
import { DogService } from "../services/dog/dogService";
import { useState, useEffect } from "react";

interface IBreedFilterProps {
    containerStyles: string,
    filterBreeds: () => void
}

const BreedFilter = ({ containerStyles, filterBreeds }: IBreedFilterProps) => {
    const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const [breeds, setBreeds] = useState<string[]>([]);

    useEffect(() => {
        dogService.GetBreeds()
            .then(response => setBreeds(response));
    }, [])


    return (
        <>
            {
                breeds.map(breed => {
                    return (
                        <div key={breed} className={containerStyles}>
                            <label className="mr-2">{breed}</label>
                            <input className="breed" value={breed} type="checkbox" onClick={filterBreeds} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default BreedFilter;