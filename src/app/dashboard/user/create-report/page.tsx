import { ReportForm } from "../../_components/report-form";
import { SiteHeaderSetter } from "../../_components/SiteHeaderSetter";

const CreateReportPage = () => {
  return (
    <div>
      <SiteHeaderSetter title="User: Create Report" />
      <ReportForm />
    </div>
  );
};

export default CreateReportPage;
