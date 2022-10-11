import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean; //isCurrent está se referindo a página atual
  onPageChange: (page: number) => void; //o Page é definido em users e é um estado
}

export function PaginationItem(
  { isCurrent = false, number, onPageChange }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        variant="outline"
        gontSize="xs"
        colorSheme="pink"
        disabled
        _disabled={{
          bg: "pink.500",
          cursor: "default",
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      variant="outline"
      gontSize="xs"
      bgColor="gray.700"
      _hover={{
        bg: "gray.500",
      }}
      onClick={() => onPageChange(number)} //number parametro da página
    >
      {number}
    </Button>
  );
}
//Se eu estiver na página atual será exibido o primeiro return