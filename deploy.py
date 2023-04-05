import json
import os
import sys
script_path = os.path.dirname(sys.modules['__main__'].__file__)

ret = os.system('git pull')

if ret != 0:
    print('==Failed to pull==')


ret = os.system('npm run build')

if ret != 0:
    print('==Failed to build==')


with open('./package.json', 'r') as p:
    package = json.loads(p.read())


def publish():

    ret = os.system('npm publish')

    if ret != 0:
        print('==Failed to publish==')

    else:
        distribute()

    print('==END==')


def distribute():
    ret = os.system(
        f"aws s3 sync ./dist/skateui s3://broadwayinc.dev/lib/js/skateui/{package['version']} --acl public-read")

    if ret != 0:
        print('==Failed to upload==')

    ret = os.system(
        f"aws s3 sync ./dist/skateui s3://broadwayinc.dev/lib/js/skateui/latest --acl public-read")

    if ret != 0:
        print('==Failed to upload==')

    os.system(
        'aws cloudfront create-invalidation --distribution-id EEQNKEUZOF5VB --paths "/lib/js/skateui/latest/*"')


if __name__ == '__main__':
    # python3 function_name arg1 arg2...
    print(f'script path: {script_path}')

    if len(sys.argv) > 1:
        argv = []
        func_name = ''
        func_name = sys.argv[1]
        argv = sys.argv[2:]
        argv_res = []

        for a in argv:
            try:
                argv_res.append(json.loads(a))
                continue
            except:
                pass

            try:
                argv_res.append(int(a))
                continue
            except:
                pass

            if a == 'true' or a == 'false':
                argv_res.append(True if a == 'true' else False)
            else:
                argv_res.append(a)

        print(f"function name: {func_name}({'*args' if argv_res else ''})")

        if argv_res:
            print('args = ', argv_res)

        globals()[func_name](*argv_res)

    else:
        print("arguments required: function_name arg1 arg2...")
        print(
            "example: python function_name 1 2 baksa \{\\\"key1\\\":1,\\\"key2\\\":\\\"Baksa\\\"\}")
