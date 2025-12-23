import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function NotFound() {
  return (
    <div className="container mx-auto w-screen h-screen flex justify-center items-center">
      <Alert variant={"destructive"} className="w-fit">
        <AlertTitle>Room does not exist</AlertTitle>
        <AlertDescription>
          This room you are trying to join does not exist
        </AlertDescription>
      </Alert>
    </div>
  );
}
