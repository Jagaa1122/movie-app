// type CrewProps = {
//   dataCrew: CrewType[];
//   dataCast: CastType[];
// };

export const Crew = (
  { dataCast }: { dataCast: CastType[] },
  { dataCrew }: { dataCrew: CrewType[] }
) => {
  const directors = dataCrew.filter((direct) => {
    return direct.known_for_department === "Directing";
  });
  const writers = dataCrew.filter((direct) => {
    return direct.known_for_department === "Writing";
  });
  console.log(directors);

  return (
    <div className="mt-[20px]">
      <div className="border-solid border-b-stone-400 border-b-[0.1px] pb-[8px] flex gap-[35px]">
        <h3 className="text-[16px] font-bold">Director</h3>
        {directors.slice(0, 1).map((director: CrewType, index: number) => {
          return (
            <p key={index} className="text-[16px]">
              {director.name}
            </p>
          );
        })}
      </div>
      <div className="border-solid border-b-stone-400 border-b-[0.1px] pb-[8px] flex gap-[35px]">
        <h3 className="text-[16px] font-bold">Writers</h3>
        {writers.slice(0, 1).map((crew: CrewType, index: number) => {
          return (
            <p key={index} className="text-[16px]">
              {crew.name}
            </p>
          );
        })}
      </div>
      <div className="border-solid border-b-stone-400 border-b-[0.1px] pb-[8px] flex gap-[35px]">
        <h3 className="text-[16px] font-bold">Stars</h3>
        <div className="flex gap-[10px]">
          {dataCast.slice(0, 5).map((actor: CastType, index: number) => {
            return (
              <p key={index} className="text-[16px]">
                {actor.name} &middot;
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
