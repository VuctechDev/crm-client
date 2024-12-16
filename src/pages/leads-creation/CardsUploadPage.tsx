import { FC, ReactElement } from "react";
import FilePicker from "@/components/file-picker/FIlePicker";
import PageWrapper from "@/layout/PageWrapper";

interface CardsUploadPageProps {}

const CardsUploadPage: FC<CardsUploadPageProps> = (): ReactElement => {
  return (
    <PageWrapper title="uploadBusinessCards" center>
      <FilePicker type="img" />
    </PageWrapper>
  );
};

export default CardsUploadPage;
