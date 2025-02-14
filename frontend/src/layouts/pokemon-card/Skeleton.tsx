import { Card, CardContent, Skeleton } from "@mui/material";

export default function PokemonCardSkeleton() {
  return (
    <Card
      sx={{
        width: 200,
        padding: 1,
        textAlign: "center",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Skeleton
        variant="rectangular"
        height={150}
        sx={{ margin: "0 auto 10px" }}
      />
      <CardContent>
        <Skeleton
          variant="text"
          width={120}
          height={28}
          sx={{ margin: "0 auto 5px" }}
        />
        <Skeleton
          variant="text"
          width={80}
          height={18}
          sx={{ margin: "0 auto" }}
        />
      </CardContent>
    </Card>
  );
}
