export default function classnames(
  ...args: (string | undefined | false | [string, boolean | undefined])[]
): string | undefined {
  const classnames: string[] = [];

  for (const classname of args) {
    if (typeof classname === "string") {
      classnames.push(classname);
    }

    if (typeof classname === "object" && !!classname[1]) {
      classnames.push(classname[0]);
    }
  }

  const result = classnames.join(" ").trim();
  return result ? result : undefined; //avoid setting className to empty string
}
