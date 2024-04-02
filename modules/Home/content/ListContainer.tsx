import { useRouter } from 'next/router';
import Devider, { create_name } from './Devider';
import Module from './Module';
import NotFound from './NotFound';
import StudyRegime from './StudyRegime';
import ListItem from './ListItem';
import Card from '../../module/content/Card';
import EditCard from '@components/EditCard';
import ScrollLoading from './ScrollLoading';
import { FC } from 'react';
import { useAppSelector } from '../../../store/hooks';
import {
  Card as CardType,
  Module as ModuleType,
} from '../../../store/reducers/main/mainInitState';

interface OwnProps {}

type Props = OwnProps;

const ListContainer: FC<Props> = () => {
  const router = useRouter();
  const { section } = router.query;

  const { modules, draft, loading, cards, search_cards, search_modules, select_by } =
    useAppSelector(({ main }) => main);

  const formatted_cards = Object.values(cards);

  return (
    <div className='home__items'>
      {section === 'cards' &&
        formatted_cards.map((card, i) => {
          const { exists, new_name } = process(formatted_cards, card, i);

          return (
            <ListItem key={card._id}>
              {!exists && <Devider name={new_name} />}
              {card.edit ? (
                <EditCard data={card} toggle={true} loading={loading} />
              ) : (
                <Card
                  data={card}
                  filter={search_cards.value}
                  filter_type={select_by.value}
                />
              )}
            </ListItem>
          );
        })}
      {section === 'modules' && (
        <>
          {draft && (
            <ListItem>
              <Devider draft={draft} />
              <Module data={draft} />
            </ListItem>
          )}
          {modules.map((module, i) => {
            const { exists, new_name } = process(modules, module, i);

            return (
              <ListItem key={module._id}>
                {!exists && <Devider name={new_name} />}
                <Module data={module} filter={search_modules.value} />
              </ListItem>
            );
          })}
        </>
      )}
      {section === 'sr' && <StudyRegime />}
      {!loading && <NotFound />}
      {section !== 'sr' && <ScrollLoading loading={loading} />}
    </div>
  );
};

export default ListContainer;

const process = (
  dataArr: CardType[] | ModuleType[],
  data: CardType | ModuleType,
  i: number
) => {
  const prev_data = dataArr[i - 1];
  const prev_name = prev_data && create_name(prev_data.creation_date);
  const new_name = create_name(data.creation_date);

  const exists = prev_name === new_name;

  return { new_name, exists };
};
