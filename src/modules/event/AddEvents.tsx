import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Tooltip,
} from "@heroui/react";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EventType } from "@/@types/event.type";
import { useFormik } from "formik";
import { IoAdd } from "react-icons/io5";
import { validateEventData } from "@/validSchema/event-validate-schema";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/category.service";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export default function AddEvents() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
      // return res;
    } catch (error) {
      throw new Error("error in fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  console.log("it is cat", categories);

  const initialValues: Partial<EventType> = {
    title: "",
    location: "",
    description: "",
    categories: [],
    bannerUrl: "",
  };

  const eventFormik = useFormik<Partial<EventType>>({
    initialValues,
    validationSchema: validateEventData,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  const checkFormError = (field: keyof EventType): boolean => {
    if (eventFormik.errors[field] && eventFormik.touched[field]) {
      return true;
    } else return false;
  };

  return (
    <>
      {/* <Button color="primary" className="" variant="ghost"></Button> */}

      <Tooltip
        showArrow
        classNames={{
          base: [
            // arrow color
            "before:bg-neutral-400 dark:before:bg-white",
          ],
          content: [
            "py-2 px-4 shadow-xl",
            "text-black bg-gradient-to-br from-white to-neutral-400",
          ],
        }}
        content="Add your event on one click"
        placement="right"
      >
        <Button
          className="bg-gradient-to-tr h-16   from-pink-500 to-yellow-500 text-white shadow-lg"
          onPress={onOpen}
          radius="full"
          size="sm"
          variant="shadow"
        >
          <IoAdd />
        </Button>
      </Tooltip>

      <Drawer
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              // duration: 0.3,
            },
            exit: {
              x: 100,
              opacity: 0,
              // duration: 0.3,
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <h1 className="text-center">Event</h1>
              </DrawerHeader>
              <form onSubmit={eventFormik.handleSubmit}>
                <DrawerBody>
                  <div>
                    <Input
                      label="Title"
                      labelPlacement="outside"
                      placeholder="Enter your title"
                      variant="bordered"
                      {...eventFormik.getFieldProps("title")}
                    />
                    {checkFormError("title") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.title}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Location"
                      labelPlacement="outside"
                      placeholder="Enter your location"
                      variant="bordered"
                      {...eventFormik.getFieldProps("location")}
                    />
                    {checkFormError("location") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.location}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="description">Description</label>
                    <ReactQuill
                      value={eventFormik.values.description}
                      onChange={(value) =>
                        eventFormik.setFieldValue("description", value)
                      }
                      onBlur={() =>
                        eventFormik.setFieldTouched("description", true)
                      }
                    />
                    {checkFormError("description") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.description}
                      </span>
                    )}
                  </div>

                  <div>
                    <Select
                      className="w-full"
                      label="Categories"
                      labelPlacement="outside"
                      placeholder="Select categories"
                      selectionMode="multiple"
                      {...eventFormik.getFieldProps("categories")}
                    >
                      {categories?.map((cat: any) => (
                        <SelectItem key={cat._id}>{cat.name}</SelectItem>
                      ))}
                    </Select>
                    {checkFormError("categories") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.categories}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="files">Upload Image</label>
                    <FilePond
                      credits={false}
                      allowMultiple={true}
                      maxFiles={1}
                      onupdatefiles={(fileItems) => {
                        eventFormik.setFieldValue(
                          "bannerUrl",
                          fileItems.map((f) => f.file)
                        );
                      }}
                      id="bannerUrl"
                      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                      {...eventFormik.getFieldProps("files")}
                    />
                    {checkFormError("bannerUrl") && (
                      <span className="text-red-500 text-xs">
                        {eventFormik.errors.bannerUrl}
                      </span>
                    )}
                  </div>
                </DrawerBody>
                <DrawerFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    // onPress={onClose}
                  >
                    Add
                  </Button>
                </DrawerFooter>
              </form>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
