import os
import shutil

# PARAMETERS ########################################################
cssMatcher = ".component.css"
srcFolderName = "src"
destFolderName = "components"
devFolderName = "components_dev"
htmlMatcher = ".component.html"
tsMatcher = ".component.ts"
######################################################################


#######################################################################
def embed_html_css_through_component_tree(dev_dir_path, dest_dir_path):
    subdirs = os.listdir(dev_dir_path)
    for subDir in subdirs:
        dev_subdir_path = dev_dir_path + "/" + subDir
        dest_subdir_path = dest_dir_path + "/" + subDir
        if os.path.isdir(dev_subdir_path):
            embed_html_css_through_component_tree(dev_subdir_path, dest_subdir_path)
        else:
            if tsMatcher in subDir:
                component_name = subDir.split('.')[0]
                dev_component_path = dev_subdir_path
                dest_component_path = dest_subdir_path
                os.remove(dest_component_path)
                dev_component = open(dev_component_path, 'r')
                dest_component = open(component_name + tsMatcher, 'w+')
                if (component_name + cssMatcher) in subdirs:
                    dest_component_css_path = dest_dir_path + "/" + component_name + cssMatcher
                    os.remove(dest_component_css_path)
                    dev_component_css_path = dev_dir_path + "/" + component_name + cssMatcher
                    dev_component_css = open(dev_component_css_path, 'r')
                else:
                    dev_component_css = ''
                if (component_name + htmlMatcher) in subdirs:
                    dest_component_html_path = dest_dir_path + "/" + component_name + htmlMatcher
                    os.remove(dest_component_html_path)
                    dev_component_html_path = dev_dir_path + "/" + component_name + htmlMatcher
                    dev_component_html = open(dev_component_html_path, 'r')
                else:
                    dev_component_html = ''
                for devComponentLine in dev_component:
                    if "templateUrl:" in devComponentLine:
                        dest_component.write("template: `\n")
                        for htmlLine in dev_component_html:
                            dest_component.write(htmlLine)
                        dest_component.write("`,\n")
                        continue
                    elif "styleUrls:" in devComponentLine:
                        dest_component.write("styles: [\n`")
                        for csslLine in dev_component_css:
                            dest_component.write(csslLine)
                        dest_component.write("`],\n")
                        continue
                    else:
                        dest_component.write(devComponentLine)
                if dev_component_css != '':
                    dev_component_css.close()
                if dev_component_html != '':
                    dev_component_html.close()
                dev_component.close()
                dest_component.close()
                shutil.move(component_name + tsMatcher, dest_component_path)

#######################################################################
rootDir = os.getcwd()
srcFolderPath = rootDir + "/" + srcFolderName
destFolderPath = rootDir + "/" + srcFolderName + "/" + destFolderName
devFolderPath = rootDir + "/" + srcFolderName + "/" + devFolderName

if destFolderName in os.listdir(srcFolderPath):
    shutil.rmtree(destFolderPath)
shutil.copytree(devFolderPath, destFolderPath)
embed_html_css_through_component_tree(devFolderPath, destFolderPath)
